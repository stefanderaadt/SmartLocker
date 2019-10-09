FROM couchbase:6.0.1

USER root

COPY configure.sh configure.sh
RUN ["chmod", "+x", "configure.sh"]
CMD ["./configure.sh"]