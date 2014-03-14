class MessagesController < ApplicationController
  before_filter :authenticate_user!
  
  def send_message(from,to,content)
    @msg = Message.new :from => from, :to => to, :content => content
    @msg.save
  end
     
  def get_message()
    
  end
end
