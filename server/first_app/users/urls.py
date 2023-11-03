from django.urls import path
from .views import RegisterView, LoginView, LogoutView, AuthView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('auth/', AuthView.as_view(), name='auth'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='refresh'),
]
