class Bar:
    def __init__(self, name, length=0):
        self.name = name
        self.pies = list(range(length, 0, -1))

    def move_to(self, target):
        if not target.pies or target.pies[-1] > self.pies[-1]:
            target.pies.append(self.pies.pop())
            print(self)
            print(target)
        else:
            print('违反规则无法移动')
    
    def __str__(self):
        return self.name + ": " + str(self.pies)



bar_a = Bar('a', 3)
bar_b = Bar('b')
bar_c = Bar('c')
print(bar_a)
bar_a.move_to(bar_b)