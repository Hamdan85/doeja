# -*- encoding : utf-8 -*-
class CreateReceivers < ActiveRecord::Migration
  def change
    create_table :receivers do |t|
      t.string :kind
      t.string :name
      t.string :address
      t.string :city
      t.string :neighborhood
      t.string :receiving
      t.text :description
      t.string :phone
      t.string :email

      t.timestamps
    end
  end
end
