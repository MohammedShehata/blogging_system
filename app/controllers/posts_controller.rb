class PostsController < ApplicationController
  before_filter :authenticate_user!
  
  def index
    @posts = current_user.posts.order("published_at DESC").page(params[:page]).per_page(10)
  end

  def new
    @post = Post.new
  end

  def create
    if params[:commit] == "Cancel"
      redirect_to posts_path
    else
      @post = Post.new params[:post]
      @post.user = current_user
      if params[:commit] == "Post"
        @post.published_at = Time.now
      end
      
      if @post.save
        redirect_to posts_path
      else
        render :action => :new
      end   
    end
  end
  
  def edit
    @post = Post.find params[:id]
  end

  def update
    if params[:commit] == "Cancel"
      redirect_to posts_path
    else
      @post = Post.find params[:id]
      @post.user = current_user
      if @post.update_attributes params[:post]
        redirect_to posts_path
      else
        render :action => :new
      end   
    end
  end

  def show
    @post = Post.find params[:id]
  end
  
  def publish
    @post = Post.find params[:id]
    
    if @post.published_at == nil
      @post.update_attributes :published_at => Time.now
    end
    
    redirect_to @post
  end
  
  def destroy
    @post = Post.find params[:id]
    @post.destroy
    
    redirect_to posts_path
  end
  
  def like
    @post = Post.find params[:id]
    
    if Like.get_like(@post, current_user) == nil
      @like = Like.new
      @like.user = current_user
      @like.post = @post
      @like.save
    end
    
    # redirect_to @post 
  end
  
  def unlike
    @post = Post.find params[:id]
    
    @like = Like.get_like(@post, current_user)
    if @like
     @like.destroy
    end
    
    redirect_to @post
  end
end
