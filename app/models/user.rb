class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  
  validates :username, :presence => true, :uniqueness => true
  validates :firstname, :presence => true
  validates :lastname, :presence => true 
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :username, :firstname, :lastname, :info, :image, :remote_image_url
  
  has_many :posts, :dependent => :destroy
  has_many :comments, :dependent => :destroy
  has_many :likes
  
  mount_uploader :image, ImageUploader
  
  belongs_to :location, :dependent => :destroy
  # accepts_nested_attributes_for :location, :reject_if => proc{|attrs| attrs.all? { |k, v| v.blank? } } 
end
