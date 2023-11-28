from django.shortcuts import render

# Create your views here.
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework import status

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import UserSerializer, UserFollowSerializer

from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
# Create your views here.

User = get_user_model()

@api_view(['GET'])
def get_user(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def profile(request, username):
    person = get_object_or_404(get_user_model(), username=username)
    serializer = UserFollowSerializer(person)
    print(serializer.data)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow(request, username):
    person = get_object_or_404(get_user_model(), username=username)
    user = request.user
    if person != user:
        if person.followers.filter(username=user.username).exists():
            person.followers.remove(user)
        else:
            person.followers.add(user)
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response({'detail': '본인을 팔로우 할 수 없습니다.'})