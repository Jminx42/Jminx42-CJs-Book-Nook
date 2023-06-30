"""empty message

Revision ID: 11634ed50a3c
Revises: cba0d9157def
Create Date: 2023-06-30 10:46:24.132829

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '11634ed50a3c'
down_revision = 'cba0d9157def'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('transaction', schema=None) as batch_op:
        batch_op.add_column(sa.Column('total_price', sa.Float(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('transaction', schema=None) as batch_op:
        batch_op.drop_column('total_price')

    # ### end Alembic commands ###
