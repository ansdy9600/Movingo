# from django.db import models
# from django.conf import settings
# # from django.contrib.auth.models import User

# # Create your models here.
# # class Review(models.Model):
# #     movie = models.IntegerField()
# #     user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
# #     # author = models.ForeignKey(User, on_delete=models.CASCADE)
# #     comment = models.TextField()
# #     rating = models.DecimalField(max_digits=3, decimal_places=2)
# #     likes = models.PositiveIntegerField(default=0)
# #     dislikes = models.PositiveIntegerField(default=0)
# #     created_at = models.DateTimeField(auto_now_add=True)
    
# #     def __str__(self):
# #         return f"Review by {self.author.user} for {self.movie.title}"