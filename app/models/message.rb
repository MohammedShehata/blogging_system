class Message < ActiveRecord::Base
  belongs_to :from, :class_name => "User"
  belongs_to :to, :class_name => "User"
  
  def encode_content
    self.content.force_encoding('UTF-8')
  end
end
