# Generated by Django 5.1 on 2024-08-19 16:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authapp', '0002_remove_user_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='IDscan',
            field=models.FileField(blank=True, null=True, unique=True, upload_to='id_scans/'),
        ),
        migrations.AlterField(
            model_name='user',
            name='phonenumber',
            field=models.CharField(max_length=15, unique=True),
        ),
    ]
