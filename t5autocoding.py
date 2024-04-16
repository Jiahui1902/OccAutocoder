from sentence_transformers import SentenceTransformer
model_path = '/path to the t5-occ parameters/'
# Load the model
model = SentenceTransformer(model_path)


def t5occ(eval_text):
  input_emb = model.encode(eval_text)
  cos_sim = [util.cos_sim(input_emb,i) for i in targetembs]
  all_sentence_combinations = []
  for i in range(len(cos_sim)-1):
    all_sentence_combinations.append([cos_sim[i][0][0],i])
  all_sentence_combinations = sorted(all_sentence_combinations, key=lambda x: x[0], reverse=True)
  occtext = [targetlabs.iloc[i[1]] for i in all_sentence_combinations[0:1]]
  occpums = dict_text2pums.loc[str.strip(occtext[0]),'2018 Census PUMS Occupation Code']
  return {occpums:occtext[0]}

