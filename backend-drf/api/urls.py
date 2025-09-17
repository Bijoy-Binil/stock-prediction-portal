from django.urls import path,include
from accounts import views as UserViews
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from .views import StockPredictionAPIView
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [



    path('register/',UserViews.RegisterView.as_view()),
    path('protected-view/',UserViews.ProtectedView.as_view()),
    #Simple Jwt
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    #API View
    path('predict/',StockPredictionAPIView.as_view(),name='stock_prediction'),
    
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
