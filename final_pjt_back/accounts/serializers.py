from rest_framework import serializers

from django.contrib.auth import get_user_model


User = get_user_model()

# 유저 정보
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'profileurl')

class UserFollowSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    followers = UserSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'profileurl' ,'followings', 'followers')

