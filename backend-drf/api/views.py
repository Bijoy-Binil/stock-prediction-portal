from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import StockPredictionSerializer
import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
import os
from django.conf import settings
from sklearn.preprocessing import MinMaxScaler
from .utils import save_plot
from keras.models import load_model
from sklearn.metrics import mean_squared_error
from sklearn.metrics import r2_score
from sklearn.metrics import root_mean_squared_error


class StockPredictionAPIView(APIView):
    def post(self,request):
        serializer=StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            ticker=serializer.validated_data['ticker']

            #Fetch the data from yfinance
            now=datetime.now()
            start=datetime(now.year-10,now.month,now.day)
            end=now
            df=yf.download(ticker,start,end)
            
            if df.empty:
                return Response({"error":"No Data Found For The Given Ticker",
                                 "status":status.HTTP_404_NOT_FOUND})
            df = df.reset_index()
            print(df)
            #Generate Basic Plot
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close,label='Closing Price')
            plt.title(f'Closing price of {ticker}')
            plt.xlabel('Days')
            plt.ylabel(' Price')
            plt.legend()
            
            # Save the plot to a file
            plot_img_path = f'{ticker}_plot.png'
            
            plot_img = save_plot(plot_img_path)
           
            #100 Days Moving Average
            ma100 = df.Close.rolling(100).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close,label='Closing Price')
            plt.plot(ma100,'r',label='100 Days MA')
            plt.title(f'100 Days Moving Average of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Price')
            plt.legend()

            # Save the plot to a file
            plot_img_path = f'{ticker}_100_dma.png'
            
            plot_100_dma = save_plot(plot_img_path)
           
            #200 Days Moving Average
            ma200 = df.Close.rolling(200).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close,label='Closing Price')
            plt.plot(ma100,'r',label='100 Days MA')
            plt.plot(ma200,'g',label='200 Days MA')
            plt.title(f'200 Days Moving Average of {ticker}')
            plt.xlabel('Days')
            plt.ylabel(' Price')
            plt.legend()

            # Save the plot to a file
            plot_img_path = f'{ticker}_200_dma.png'
            
            plot_200_dma = save_plot(plot_img_path)
           
            #Splitting the data into Training && Testing Datasets
            data_training=pd.DataFrame(df.Close[0:int(len(df)*0.7)])
            data_testing=pd.DataFrame(df.Close[int(len(df)*0.7): int(len(df))])

            print(data_training)
            print(data_testing)
            
            #Scaling down the data betwwen 0 and 1

            scaler=MinMaxScaler(feature_range=(0,1))

            #Load ML Model 
            model = load_model('Stock_prediction_model.keras')

            #Prepare the Test Data
            past_100_days=data_training.tail(100)
            final_df=pd.concat([past_100_days,data_testing],ignore_index=True)
            input_data=scaler.fit_transform(final_df)

            x_test=[]
            y_test=[]

            for i in range(100,input_data.shape[0]):
                x_test.append(input_data[i-100:i])
                y_test.append(input_data[i,0])

            x_test,y_test=np.array(x_test),np.array(y_test)


            #Making predcition
            y_predicted=model.predict(x_test)

            #Revert the scaled prices to original price
            y_predicted = scaler.inverse_transform(y_predicted.reshape(-1,1)).flatten()
            y_test = scaler.inverse_transform(y_test.reshape(-1,1)).flatten()

            #Plot the final prediction
            print("y_predicted==>",y_predicted)
            print("y_test==>",y_test)


            
            # Plot Final Precition!
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(y_test,'b',label='Original Price')
            plt.plot(y_predicted,'r',label='Predicted Price')
            plt.title(f'Final Prediction of {ticker}')
            plt.xlabel('Days')
            plt.ylabel(' Price')
            plt.legend()

            # Save the plot to a file
            plot_img_path = f'{ticker}_final_prediction.png'
            
            plot_prediction = save_plot(plot_img_path)

            # Model Evaluation 
            mse=mean_squared_error(y_test,y_predicted)
            r2=r2_score(y_test,y_predicted)
            rmse=np.sqrt(mse)
        
            return Response({'status':"success",
                             'plot_img':plot_img,
                             'plot_100_dma':plot_100_dma,
                             'plot_200_dma':plot_200_dma,
                             'plot_prediction':plot_prediction,
                             "mse":mse,
                             "rmse":rmse,
                             "r2":r2,
                             },
                             status=status.HTTP_200_OK)
