class MessagesController < ApplicationController
  before_filter :authenticate_user!
  
  def send_message
    @to = User.find params[:to]
    @msg = Message.new :content => params[:content], :from => current_user, :to => @to 
    @msg.save
  end
     
  def get_messages
    @messages = Message.where("to_id = ? and created_at >= ?", current_user.id, Time.now - 20)
    respond_to do |format|
      format.json {
          render :json =>{:messages => @messages.to_json(
          :include => { 
            :from => {:only=>[:id, :username], methods: :encode_user_name}
            },
        :only =>[:id, :content], 
        methods: :encode_content)
        } 
      }  
    end
    
  end
end
