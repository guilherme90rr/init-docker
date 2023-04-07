FROM eclipse-temurin:17-jdk-alpine
ENV USERNAME dev
RUN adduser -D $USERNAME
WORKDIR /home/${USERNAME}/app
ARG JAR_FILE=doitdocker.jar
COPY ${JAR_FILE} app.jar
RUN chown -R $USERNAME /home/$USERNAME
USER $USERNAME
ENTRYPOINT ["java","-jar","/home/dev/app/app.jar"]