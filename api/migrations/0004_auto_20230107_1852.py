# Generated by Django 3.2.7 on 2023-01-07 18:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20230107_1246'),
    ]

    operations = [
        migrations.AlterField(
            model_name='addfriends',
            name='receiver',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='receiver', to='api.viewfriends'),
        ),
        migrations.AlterField(
            model_name='addfriends',
            name='sender',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sender', to='api.viewfriends'),
        ),
    ]
