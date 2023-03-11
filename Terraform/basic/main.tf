provider "aws" {
  region = var.provider_region # "us-east-1"
}

# Resource block; contains resource provisioning info
resource "aws_instance" "test_vm" {
  ami = var.ami # "ami-09a0dac4253cfa03f"
  subnet_id = var.subnet_id # "subnet-094f475f318a08654"
  instance_type = var.instance_type # "t3.micro"
  tags = {
    "Name" = "test-vm"
  }
}