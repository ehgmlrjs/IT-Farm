import jwt
from rest_framework.views import APIView
from .serializers import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.shortcuts import render, get_object_or_404
from first_app.my_settings import SECRET_KEY
from .models import RefreshToken


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "성공"}, status=status.HTTP_201_CREATED)
        errors = serializer.errors
        return Response({"message": "실패", "error": errors}, status=status.HTTP_400_CREATED)


class AuthView(APIView):
    def post(self, request):
        try:
            authorization_header = request.META.get('HTTP_AUTHORIZATION')
            token = authorization_header
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            pk = payload.get('user_id')
            user = get_object_or_404(User, pk=pk)
            serializer = UserSerializer(instance=user)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except(jwt.exceptions.ExpiredSignatureError):
            user_id = request.data.get('id')
            refresh_token = RefreshToken.objects.get(
                user_id=user_id).refresh_token
            data = {'refresh': refresh_token}
            serializer = TokenRefreshSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                access = serializer.validated_data['access']
                payload = jwt.decode(access, SECRET_KEY, algorithms=['HS256'])
                pk = payload.get('user_id')
                user = get_object_or_404(User, pk=pk)
                serializer = UserSerializer(instance=user)
                res = Response({'user': serializer.data,
                                'access': str(access)}, status=status.HTTP_200_OK)
                return res
            raise jwt.exceptions.InvalidTokenError

        except(jwt.exceptions.InvalidTokenError):
            return Response(status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        if not email or not password:
            return Response({'error': 'Please provide both email and password'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=email, password=password)
        if user:
            serializer = UserSerializer(user)
            user_id = serializer.data.get('id')

            if RefreshToken.objects.filter(user_id=user_id):
                return Response({'message':'이미 로그인'})
            
            refresh = TokenObtainPairSerializer.get_token(user)
            RefreshToken.objects.create(user=user, refresh_token=refresh)
            
            return Response({
                'user': serializer.data,
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    def post(self, request):
        user_id = request.data.get('id')
        RefreshToken.objects.filter(user_id=user_id).delete()
        return Response({
            'message': 'Logout success'
        }, status=status.HTTP_200_OK)
