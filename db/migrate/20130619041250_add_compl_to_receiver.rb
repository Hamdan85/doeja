# -*- encoding : utf-8 -*-
class AddComplToReceiver < ActiveRecord::Migration
  def change
    add_column :receivers, :compl, :string
  end
end
