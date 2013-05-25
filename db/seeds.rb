# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)

for i in 1..20 do
  str = "user" + i.to_s
  User.create(:email => str+"@"+str+".com", :password => "pass",:username => str, 
  :firstname => "first"+i.to_s, :lastname => "last"+i.to_s, :info => "info"+i.to_s)
end
