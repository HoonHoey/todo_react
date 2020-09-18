# Generated by Django 3.1.1 on 2020-09-16 04:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_user_phone_number'),
        ('study', '0002_scores'),
    ]

    operations = [
        migrations.AddField(
            model_name='students',
            name='memo',
            field=models.CharField(max_length=300, null=True),
        ),
        migrations.AddField(
            model_name='students',
            name='reg_user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='account.user'),
            preserve_default=False,
        ),
    ]
