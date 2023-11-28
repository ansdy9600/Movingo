# from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.urls import path
from . import views

app_name = 'articles'

urlpatterns = [
    path('articles/', views.article_list),
    path('articles/<int:article_pk>/', views.article_detail),
    path('articles/<int:article_pk>/comments/', views.comment_list),
    path('articles/<int:article_pk>/comments/<int:comment_pk>/', views.comment_detail),
    path('articles/<int:article_pk>/create_comments/', views.comment_create),
    path('articles/<int:article_pk>/like_article/', views.like_article),
    path('articles/user_article/', views.user_article)
    # # 필수 작성
    # path('schema/', SpectacularAPIView.as_view(), name='schema'),
    # # optional UI
    # path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]