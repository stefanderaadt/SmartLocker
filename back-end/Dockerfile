#FROM openjdk:8-jdk-alpine
#ADD .mvn/wrapper/maven-wrapper.jar app.jar
#ENTRYPOINT ["java","-jar","app.jar"]
#EXPOSE 8000


#
# Build stage
#
FROM maven:3.6.1-jdk-8-slim AS build
COPY . /home/app
WORKDIR /home/app
RUN mvn clean package

#
# Package stage
#
FROM openjdk:8-jdk-alpine
COPY --from=build /home/app/application/target/application-0.0.2-SNAPSHOT-spring-boot.jar /usr/local/lib/app.jar
EXPOSE 8000
ENTRYPOINT ["java","-jar","/usr/local/lib/app.jar"]