# Generated by Django 5.1 on 2024-09-13 18:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bestPolice', '0002_shortlistedpolicestationaddress'),
    ]

    operations = [
        migrations.RenameField(
            model_name='shortlistedpolicestationaddress',
            old_name='city',
            new_name='state',
        ),
    ]
