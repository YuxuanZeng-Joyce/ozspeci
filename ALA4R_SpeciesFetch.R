#install.packages("ALA4R")
library("ALA4R")

species <- read.csv("C:/Users/hp/Desktop/dangerous.csv")


species <- unique(species$Scientific_name)


df2 <- data.frame(
  stringsAsFactors=FALSE) 

for(i in species){
  x = paste0("taxon_name:\\\"", i, "\\\"")
  cat(x)
  df <- occurrences(taxon=x,
                    fq = "state:Victoria",
                    qa="none",download_reason_id=10)
  
  a <- df$data
  
  df2 <- rbind(a, df2)
}
#df3<-df2[df2$year>=2010,]
df5<-df2[df2$year>=2019,]
df5<-df5[!is.na(df5$year),]

write.csv(df5, file = "C:/Users/hp/Desktop/datafor10dangerousanimals.csv")


