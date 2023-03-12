terraform {
  required_providers {
    docker = {
      source = "kreuzwerker/docker"
    }
  }
  required_version = ">= 0.13"
  backend "s3" {
    profile = "demo" # profile for authn with the aws_cli
    region  = "us-east-1"
    key     = "terraform.tfstate"
    bucket  = "<AWS-S3-BUCKET-NAME-GOES-HERE>"
  }
}