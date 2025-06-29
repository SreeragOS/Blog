from .models import Post, Comment
from rest_framework import serializers

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ['author', 'post','created_at']

class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)  # 👈 This line adds nested comments

    class Meta:
        model = Post
        fields = '__all__'
    def get_comments(self, obj):
        comments = Comment.objects.filter(post=obj).order_by('-created_at')
        return CommentSerializer(comments, many=True).data