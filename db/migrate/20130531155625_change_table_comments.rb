class ChangeTableComments < ActiveRecord::Migration
  def self.up
    change_table :comments do |t|
      t.remove :content
      t.text :content
    end
  end

  def self.down
  end
end
