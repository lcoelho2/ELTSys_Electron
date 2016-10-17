#!/usr/local/bin/rscript
args = commandArgs(trailingOnly=TRUE)
end <- args[1]

sink("NUL")
suppressMessages(rmarkdown::render('eltdash.Rmd'))
sink()
