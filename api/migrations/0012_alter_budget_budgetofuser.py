# Generated by Django 3.2.7 on 2023-02-02 10:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_budget'),
    ]

    operations = [
        migrations.AlterField(
            model_name='budget',
            name='budgetofUser',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
