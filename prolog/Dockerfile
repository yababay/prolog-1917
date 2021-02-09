FROM swipl
WORKDIR /srv
CMD ["mkdir", "persons-1917"]
CMD ["mkdir", "persons-1917/facts"]
CMD ["mkdir", "persons-1917/funcs"]
COPY persons-1917 persons-1917
COPY persons-1917/facts persons-1917/facts
COPY persons-1917/funcs persons-1917/funcs
COPY *.pl ./
EXPOSE 8030
ENTRYPOINT ["swipl", "./index.pl"]

