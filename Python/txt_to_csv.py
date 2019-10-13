# elapsed time, voltage write to CSV file
import csv

input_file_name = 'PT-07_charge_8-2017_06_11_10_02_33.txt'
output_file_name = 'PT-07_charge_8-2017_06_11_10_02_33.csv'

with open(input_file_name, 'r') as input_file, open(output_file_name, 'w') as output_file:
    reader = csv.reader(input_file, delimiter=',', quoting=csv.QUOTE_NONE)
    
    for _ in range(4):
        next(reader, None)
        
    writer = csv.writer(output_file)

    for row in reader:
        write_item = str(row[3]) + ', ' + str(row[1]) + '\n'

        output_file.write(write_item)
        # writer.writerow(write_item)
        print(write_item)