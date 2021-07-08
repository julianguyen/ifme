# frozen_string_literal: true
module MedicationsFormHelper
  include FormHelper

  def new_medication_props
    new_form_props(medication_form_inputs, medications_path)
  end

  def edit_medication_props
    edit_form_props(medication_form_inputs, medication_path(@medication))
  end

  def medications_props(medications)
    medications.map { |medication| present_medication(medication) }
  end

  private

  def medication_form_inputs
    current_user.oauth_enabled? ? google_fields : common_fields
  end

  def medication_basic_props(field)
    { id: "medication_#{field}", name: "medication[#{field}]", dark: true }
  end

  def refill_reminder(field, info, checked, label = nil)
    {
      id: "medication_#{field}",
      type: 'checkbox',
      label: label || t("medications.#{field}"),
      info: info,
      name: "medication[#{field}][active]",
      checked: checked
    }.merge(dark: true, uncheckedValue: false, value: true)
  end

  def medication_refill_reminder
    refill_reminder(
      'refill_reminder_attributes',
      t('medications.form.refill_reminder_hint'),
      @medication&.refill_reminder&.active,
      t('medications.refill_reminder')
    )
  end

  def medication_take_medication_reminder_attributes
    refill_reminder(
      'take_medication_reminder_attributes',
      t('medications.form.daily_reminder_hint'),
      @medication&.take_medication_reminder&.active,
      t('common.daily_reminder')
    )
  end

  def hidden_fields
    [
      hidden_props(
        'refill_reminder_attributes',
        @medication&.refill_reminder&.id
      ),
      hidden_props(
        'take_medication_reminder_attributes',
        @medication&.take_medication_reminder&.id
      )
    ]
  end

  def reminder_fields
    [
      medication_refill_reminder,
      medication_take_medication_reminder_attributes
    ].concat(hidden_fields)
  end

  def hidden_props(field, value)
    {
      id: "medication_#{field}_id",
      name: "medication[#{field}][id]",
      type: 'hidden',
      value: value
    }
  end

  def medication_weekly_dosage
    {
      type: 'checkboxGroup',
      # checkboxes: days_checkbox,
      label: t('common.days'),
      info: t('medications.form.weekly_dosage_hint'),
      required: true
    }.merge(medication_basic_props('weekly_dosage'))
  end

  def extra_fields
    [medication_refill, medication_comments]
  end

  def common_fields
    [
      medication_name,
      medication_field('strength'),
      medication_strength_unit,
      medication_field('total'),
      medication_unit_field('total'),
      medication_field('dosage'),
      medication_unit_field('dosage')
    ].concat(daily_reminder).concat(extra_fields).concat(reminder_fields)
  end

  def medication_comments
    {
      type: 'textarea',
      label: t('comment.plural'),
      value: @medication.comments || nil,
      info: t('medications.form.comments_hint')
    }.merge(medication_basic_props('comments'))
  end

  def medication_strength_unit
    {
      type: 'radio',
      label: t('medications.form.strength_unit'),
      value: @medication.strength_unit || t('medications.units.mg'),
      options: [
        medication_type_unit_mg('strength'),
        medication_type_unit_ml('strength')
      ]
    }.merge(medication_basic_props('strength_unit'))
  end

  def medication_name
    {
      type: 'text',
      label: t('common.name'),
      value: @medication.name || nil,
      info: t('medications.form.name_hint'),
      required: true
    }.merge(medication_basic_props('name'))
  end

  def daily_reminder_checkbox(i)
    {
      id: "medication_weekly_dosage_#{i}",
      type: 'checkbox',
      label: t(:'date.abbr_day_names')[i],
      name: 'medication[weekly_dosage][]',
      checked: @medication.weekly_dosage.include?(i),
      value: i,
      dark: true
    }
  end

  def daily_reminder_input(i)
    {
      type: 'time',
      name: 'medication[weekly_dosage_time]',
    }.merge(medication_basic_props('daily_reminder_input'))
  end

  def daily_reminder
    [
      medication_weekly_dosage,
      daily_reminder_checkbox(0),
      daily_reminder_input(0),

      daily_reminder_checkbox(1),
      daily_reminder_input(1),

      daily_reminder_checkbox(2),
      daily_reminder_input(2),

      daily_reminder_checkbox(3),
      daily_reminder_input(3),

      daily_reminder_checkbox(4),
      daily_reminder_input(4),

      daily_reminder_checkbox(5),
      daily_reminder_input(5),

      daily_reminder_checkbox(6),
      daily_reminder_input(6)
    ]
  end

  def medication_refill
    {
      type: 'date',
      label: t('medications.form.refill'),
      value: @medication.refill&.to_date || nil,
      info: t('medications.form.refill_hint'),
      required: false
    }.merge(medication_basic_props('refill'))
  end

  def google_fields
    common_fields.push({
      type: 'checkbox',
      label: t('medications.form.add_to_google_cal'),
      info: t('medications.form.google_cal_hint'),
      checked: @medication.add_to_google_cal || nil,
      uncheckedValue: false,
      value: true
    }.merge(medication_basic_props('add_to_google_cal')))
  end

  def days_checkbox
    0.upto(6).map do |i|
      {
        id: "medication_weekly_dosage_#{i}",
        type: 'checkbox',
        name: 'medication[weekly_dosage][]',
        label: t(:'date.abbr_day_names')[i],
        checked: @medication.weekly_dosage.include?(i),
        value: i
      }
    end
  end

  def medication_type_unit_tablets(type)
    {
      id: "medication_#{type}_unit_tablets",
      label: t('medications.units.tablets.other'),
      value: t('medications.units.tablets.other')
    }
  end

  def medication_type_unit_mg(type)
    {
      id: "medication_#{type}_unit_mg",
      label: t('medications.units.mg'),
      value: t('medications.units.mg')
    }
  end

  def medication_type_unit_ml(type)
    {
      id: "medication_#{type}_unit_ml",
      label: t('medications.units.ml'),
      value: t('medications.units.ml')
    }
  end

  def medication_unit_options(type)
    [
      medication_type_unit_tablets(type),
      medication_type_unit_mg(type),
      medication_type_unit_ml(type)
    ]
  end

  def medication_unit_field(type)
    {
      type: 'radio',
      label: t("medications.form.#{type}_unit"),
      value: @medication["#{type}_unit"] ||
        t('medications.units.tablets.other'),
      options: medication_unit_options(type)
    }.merge(medication_basic_props("#{type}_unit"))
  end

  def medication_field(type)
    {
      type: 'number',
      label: t("medications.form.#{type}"),
      value: @medication[type.to_s] || nil,
      info: t("medications.form.#{type}_hint"),
      required: true
    }.merge(medication_basic_props(type))
  end

end
