const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require('graphql');
const _ = require('lodash');

let { movies } = require('./data.js')

// Define Movie Type
movieType = new GraphQLObjectType({
    name: 'Movie',
    fields: {
        id: { type:GraphQLID },
        name: { type:GraphQLString },
        year: { type:GraphQLInt },
        directorId: { type: GraphQLID }
    }
});

// Define Director Type
directorType = new GraphQLObjectType({
    name: 'Director',
    fields: {
        id: { type:GraphQLID },
        name: { type:GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(movieType),
            // Para trazer uma lista de filmes, precisamos declarar
            // uma funcao dentro do typo da query, que vai retornar
            // um campo do tipo GraphQLList para retornar uma lista
            // de filmes
            resolve(source, args) {
                return _.filter(movies, { directorId: source.id });
            }
        }
    }
});

exports.movieType = movieType;
exports.directorType = directorType;