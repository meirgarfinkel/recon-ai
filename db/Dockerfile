FROM pgvector/pgvector:pg16

# Fix the control file naming issue
RUN cd /usr/share/postgresql/16/extension && \
  ln -s vector.control pgvector.control
