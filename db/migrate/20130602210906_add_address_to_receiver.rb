class AddAddressToReceiver < ActiveRecord::Migration
  def change
    add_column :receivers, :address, :string
  end
end
