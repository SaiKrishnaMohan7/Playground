# CLI input vars take precedece over this

variable "provider_region" {
  type = "string"
  default = "us-east-1"
}

variable "ami" {
  type = "string"
  default = "ami-09a0dac4253cfa03f"
}

variable "subnet_id" {
  type = "string"
  default = "subnet-094f475f318a08654"
}

variable "instance_type" {
  type = "string"
  default = "t3.micro"
}