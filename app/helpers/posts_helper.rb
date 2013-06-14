module PostsHelper
  
  def format_date(post)
    post.published_at != nil ? post.published_at.strftime("%D %H:%M") : "Not Published Yet"
  end
end
