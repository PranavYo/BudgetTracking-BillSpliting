# Generated by Django 3.2.7 on 2023-01-08 19:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_viewfriends_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='viewfriends',
            name='name',
            field=models.CharField(max_length=50, null=True, verbose_name='<django.db.models.query_utils.DeferredAttribute object at 0x1054ccee0>'),
        ),
    ]