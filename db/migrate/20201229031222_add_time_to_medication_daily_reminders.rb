class AddTimeToMedicationDailyReminders < ActiveRecord::Migration[6.0]
  def change
    add_column :medications, :sunday, :time
    add_column :medications, :monday, :time
    add_column :medications, :tuesday, :time
    add_column :medications, :wednesday, :time
    add_column :medications, :thursday, :time
    add_column :medications, :friday, :time
    add_column :medications, :staurday, :time
  end
end
