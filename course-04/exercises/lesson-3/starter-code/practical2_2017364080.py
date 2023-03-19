num_list = []
for i in range(5):
    num = int(input("Enter an integer: "))
    num_list.append(num)

# Find and display the highest and lowest values in the list
highest = max(num_list)
lowest = min(num_list)
print("Highest value:", highest)
print("Lowest value:", lowest)