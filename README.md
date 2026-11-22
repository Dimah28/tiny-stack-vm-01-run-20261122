[![make.fun](https://make.fun/badge/tiny-stack-vm-01-run-20261122.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)

# Tiny Stack VM

A tiny stack virtual machine for the [make.fun bounty](https://make.fun/bounty/tiny-stack-vm-01-run-20261122). Runs each program.bin on its input.bin and writes stdout.bin + exit.txt, faithfully following ISA.md (traps, limits, wrapping arithmetic).

Run: `node main.ts` (reads /input, writes /output; or set MAKEFUN_INPUT_DIR / MAKEFUN_OUTPUT_DIR).
