# Generated by Django 3.0.7 on 2020-06-23 16:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='regularPizza',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300)),
                ('small', models.IntegerField()),
                ('large', models.IntegerField()),
            ],
        ),
    ]
