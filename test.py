import matplotlib.pyplot as plt
import matplotlib.patches as patches

# Create figure
fig, ax = plt.subplots(figsize=(8,6))

# Draw rectangles for components
components = {
    "Input": (0.1, 0.7),
    "Output": (0.7, 0.7),
    "Memory": (0.4, 0.7),
    "Control Unit": (0.4, 0.4),
    "ALU": (0.4, 0.1),
    "CPU": (0.35, 0.25)
}

# Draw main memory
ax.add_patch(patches.Rectangle((0.35, 0.65), 0.3, 0.15, fill=True, edgecolor="black", facecolor="lightblue"))
ax.text(0.5, 0.725, "Memory\n(Instructions + Data)", ha="center", va="center", fontsize=10, weight="bold")

# Input
ax.add_patch(patches.Rectangle((0.05, 0.65), 0.2, 0.15, fill=True, edgecolor="black", facecolor="lightgreen"))
ax.text(0.15, 0.725, "Input", ha="center", va="center", fontsize=10, weight="bold")

# Output
ax.add_patch(patches.Rectangle((0.65, 0.65), 0.2, 0.15, fill=True, edgecolor="black", facecolor="lightgreen"))
ax.text(0.75, 0.725, "Output", ha="center", va="center", fontsize=10, weight="bold")

# Control Unit
ax.add_patch(patches.Rectangle((0.35, 0.35), 0.3, 0.15, fill=True, edgecolor="black", facecolor="lightyellow"))
ax.text(0.5, 0.425, "Control Unit", ha="center", va="center", fontsize=10, weight="bold")

# ALU
ax.add_patch(patches.Rectangle((0.35, 0.05), 0.3, 0.15, fill=True, edgecolor="black", facecolor="lightcoral"))
ax.text(0.5, 0.125, "ALU\n(Arithmetic Logic Unit)", ha="center", va="center", fontsize=10, weight="bold")

# Arrows
arrowprops = dict(arrowstyle="->", lw=1.5, color="black")

# Input -> Memory
ax.annotate("", xy=(0.35,0.725), xytext=(0.25,0.725), arrowprops=arrowprops)
# Memory -> Control Unit
ax.annotate("", xy=(0.5,0.65), xytext=(0.5,0.5), arrowprops=arrowprops)
# Control Unit -> ALU
ax.annotate("", xy=(0.5,0.35), xytext=(0.5,0.2), arrowprops=arrowprops)
# ALU -> Memory
ax.annotate("", xy=(0.5,0.2), xytext=(0.5,0.65), arrowprops=arrowprops)
# Memory -> Output
ax.annotate("", xy=(0.65,0.725), xytext=(0.65,0.725), arrowprops=arrowprops)

# Hide axes
ax.axis("off")
plt.show()
