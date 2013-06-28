class AddTokenToReceiver < ActiveRecord::Migration
  def change
    add_column :receivers, :token, :string
  end
end
