class Like < ActiveRecord::Base
  belongs_to :post
  belongs_to :user
  
  #validates :post, :uniqueness => true, :scope => :user, :message => "User can like the post only one time"
  
  def self.get_like(post, user)
    return Like.where("post_id = ? and user_id = ?", post.id, user.id)[0]  
  end
  
end
