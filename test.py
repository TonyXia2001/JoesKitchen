with open("foods.txt", "r") as f:
    with open("output.txt", "w") as w:
        out = []
        for line in f.readlines():
            out.append(line.strip())
        w.write(str(out))