# desafio_at

## Objetivo
Este código é uma solução densenvolvida em 10 dias para o desafio proposto durante uma das etapas do processo seletivo da INOA.

O intuito da aplicação é auxiliar um investidor nas decisões de compra e venda de ativos, de maneira que o sistema busca periodicamente a cotação do ativo, de acordo com as configurações estabelecidas pelo usuário.

## Desenvolvimento

<li>Frotend: React</li>
<li>Backend: Python - Django</li>
<li>Banco de dados: MySQL</li>
<br/>
A página inicial da aplicação renderiza as informações de configuração dos ativos já adicionados pelo usuário em uma tabela, com a opção de dois botões para cada linha: 'Excluir', que deleta aquela configuração do banco de dados, e 'Detalhes' que direciona para uma nova página onde o usuário tem acesso às cotações anteriores armazenadas pelo servidor.
<br/>
<br/>
Na barra de navegação, há duas opções <em>My Assets</em> e <em>New assets</em>. A primeira direciona para a página inicial, enquato a segundo direciona o usuário para uma nova página onde uma gama de ativos estão disponíveis para adição, dispostos em uma tabela. A tabela dispõe de 3 campos de <em> Input </em>, para configurar o monitoramento, além de um botão de adicionar. Quando um ativo é adicionado ao monitoramento, ele deixa de fazer parte da tabela em <em>New Assets</em> e começa a fazer parte da tabela em <em>My Assets</em> e uma verificação de cotação ocorre no momento da adição.
<br/>
<br/>
O monitoramente ocorre periodicamente, de acordo com a configuração decidida para cada ativo, e é gerenciada pela biblioteca APScheduler. A consulta é feita à API do yahooquery e quando é verificado que a cotação está acima ou abaixo dos parâmetros de túnel de preço, um email é enviado para o usuário, indicando a situação e informando a cotação monitorada.
<br/>
<br/>

### Considerações finais
Para o funcionamento  desta aplicação, o banco de dados foi manualmente populado com as informações de 1 usuário e com os símbolos disponíveis na B3, de acordo com a biblioteca <em>investpy</em>. Como não fora configurado um sistema de login e autenticação, as partes do código que necessitam de alguma informação do usuário, como a adição de um novo monitoramento, estão <em>hardcoded</em>

Durante o desenvolvimento do código, foi considerado o uso da API Alpha Vantage para adicionar mais uma funcionalidade na página <em>New Asset</em>: Barra de pesquisa para filtrar os símbolos disponíveis relacionados com a palavra chave disponibilizada. Essa funcionalidade permitiria monitorar não só os ativos da B3, mas também de outros mercados. Entretanto, a API tinha um limite de 25 requisições gratuitas por dia, então a implementação foi reconsiderada.

Por fim, gostaria de agradecer a oportunidade de realizar o desafio.

João Victor Menezes
