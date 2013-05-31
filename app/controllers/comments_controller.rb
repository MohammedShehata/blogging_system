class CommentsController < ApplicationController
  before_filter :authenticate_user!
  
  def create
    @comment = Comment.new params[:comment]
    @post = Post.find params[:post_id]
    @comment.user = current_user
    @comment.post = @post
    @comment.save
    redirect_to @post
  end
  
  def destroy
    @comment = Comment.find params[:id]
    @comment.destroy
    
    redirect_to @comment.post  
  end
end
