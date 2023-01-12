"""empty message

<<<<<<<< HEAD:migrations/versions/c137457f0c1b_.py
Revision ID: c137457f0c1b
Revises: 
Create Date: 2023-01-09 17:54:09.543677
========
Revision ID: ea499693633b
Revises: 
Create Date: 2023-01-09 17:23:49.104550
>>>>>>>> main:migrations/versions/ea499693633b_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<<< HEAD:migrations/versions/c137457f0c1b_.py
revision = 'c137457f0c1b'
========
revision = 'ea499693633b'
>>>>>>>> main:migrations/versions/ea499693633b_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('category',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=30), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('parking',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('site', sa.String(length=4), nullable=True),
    sa.Column('car_plate', sa.String(length=30), nullable=True),
    sa.Column('user_id', sa.String(length=30), nullable=True),
    sa.Column('category_id', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('car_plate'),
    sa.UniqueConstraint('site'),
    sa.UniqueConstraint('user_id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=20), nullable=True),
    sa.Column('surname', sa.String(length=20), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=True),
    sa.Column('password', sa.String(length=80), nullable=True),
    sa.Column('telephone', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('telephone')
    )
    op.create_table('car',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('plate', sa.String(length=9), nullable=True),
    sa.Column('brand', sa.String(length=30), nullable=True),
    sa.Column('model', sa.String(length=80), nullable=True),
    sa.Column('category_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['category_id'], ['category.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('plate')
    )
    op.create_table('my_cars',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('car_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['car_id'], ['car.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('my_cars')
    op.drop_table('car')
    op.drop_table('user')
    op.drop_table('parking')
    op.drop_table('category')
    # ### end Alembic commands ###
