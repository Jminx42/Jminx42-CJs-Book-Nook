"""empty message

Revision ID: 9447d79785ea
Revises: a40170e60ff5
Create Date: 2023-05-21 15:17:04.491049

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9447d79785ea'
down_revision = 'a40170e60ff5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('token', sa.String(length=250), nullable=True))
        batch_op.create_unique_constraint(None, ['token'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('token')

    # ### end Alembic commands ###
